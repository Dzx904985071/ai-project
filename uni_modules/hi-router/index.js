import {
    objectDeepMerge,
    uniGetPageData,
    uniGetCurrentPageData,
    isFunction,
    isString,
    uniIsTabBar,
    isAbsoluteURL,
    uniIsPageExist,
    isNumber
} from "./functions";

export default {
    install(app, options) {
        // 默认配置项
        let _config = {
            /**
             * 前置路由拦截器函数
             * @param {Object} targetPage 目标页面数据
             * @param {Object} currentPage 当前页面数据
             * @returns {Boolean} true: 继续执行跳转，false: 终止跳转
             */
            before: null,

            /**
             * 后置路由拦截器函数
             * @param {Object} currentPage 当前页面数据
             * @returns
             */
            after: null
        };

        // 合并配置
        _config = objectDeepMerge(_config, options);

        // 只执行一次的后置钩子函数
        let _onceAfter = null;

        /**
         * 设置配置
         * @param {Object} config 配置数据
         */
        function setConfig(config = {}) {
            _config = objectDeepMerge(_config, config);
        }

        // 复制 uni 的路由方法
        const originalNavigationTo = uni.navigateTo;
        const originalRedirectTo = uni.redirectTo;
        const originalReLaunch = uni.reLaunch;
        const originalSwitchTab = uni.switchTab;
        const originalNavigateBack = uni.navigateBack;

        // 跳转前的拦截函数
        function beforeTo(params) {
            const targetPageData = uniGetPageData(params?.url);
            const currentPageData = uniGetCurrentPageData();
            if (isFunction(_config?.before) && !_config?.before(targetPageData, params, currentPageData)) return false;
            if (isFunction(params?.before) && !params?.before(targetPageData, params, currentPageData)) return false;
            return params;
        }

        // 跳转后处理函数
        function afterTo(params) {
            _onceAfter = params?.after;
        }

        // 重写 uni 的路由方法
        uni.navigateTo = function (params = {}) {
            params.method = "navigateTo";
            if (!beforeTo(params)) return;
            afterTo(params);
            originalNavigationTo(params);
        };

        // 重写 uni 的路由方法
        uni.redirectTo = function (params = {}) {
            params.method = "redirectTo";
            if (!beforeTo(params)) return;
            afterTo(params);
            originalRedirectTo(params);
        };

        // 重写 uni 的路由方法
        uni.reLaunch = function (params = {}) {
            params.method = "reLaunch";
            if (!beforeTo(params)) return;
            afterTo(params);
            originalReLaunch(params);
        };

        // 重写 uni 的路由方法
        uni.switchTab = function (params = {}) {
            params.method = "switchTab";
            if (!beforeTo(params)) return;
            afterTo(params);
            originalSwitchTab(params);
        };

        // 重写 uni 的路由方法
        uni.navigateBack = function (params = {}) {
            params.method = "navigateBack";
            if (!params?.delta) params.delta = 1;
            if (!beforeTo(params)) return;
            afterTo(params);
            originalNavigateBack(params);
        };

        /**
         * 保留当前页面，跳转到应用内的某个页面
         * @param {Object|String} params 当是字符串时表示目标页面路径，当是对象时参数对象（通常和 uni-app 对应的路由方法的参数一致）
         */
        function navigateTo(params = {}) {
            _routeTo(params, "navigateTo");
        }

        /**
         * 关闭当前页面，跳转到应用内的某个页面
         * @param {Object|String} params 当是字符串时表示目标页面路径，当是对象时参数对象（通常和 uni-app 对应的路由方法的参数一致）
         */
        function redirectTo(params = {}) {
            _routeTo(params, "redirectTo");
        }

        /**
         * 关闭所有页面，打开到应用内的某个页面
         * @param {Object|String} {Object|String} params 当是字符串时表示目标页面路径，当是对象时参数对象（通常和 uni-app 对应的路由方法的参数一致）
         */
        function reLaunch(params = {}) {
            _routeTo(params, "reLaunch");
        }

        /**
         * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
         * @param {Object|String} {Object|String} params 当是字符串时表示目标页面路径，当是对象时参数对象（通常和 uni-app 对应的路由方法的参数一致）
         */
        function switchTab(params = {}) {
            _routeTo(params, "switchTab");
        }

        /**
         * 关闭当前页面，返回上一页面或多级页面
         * @param {Object|String} {Object|String} params 当是字符串时表示目标页面路径，当是对象时参数对象（通常和 uni-app 对应的路由方法的参数一致）
         * @param {Number} delta 返回的页面数
         */
        function navigateBack(params = {}) {
            if (isNumber(params)) params = { delta: params };
            _routeTo(params, "navigateBack");
        }

        /**
         * 默认跳转到目标页
         * 1. 如果目标页面是一个绝对 URL
         *   - 如果是在 H5 环境中：直接用 window.open() 打开页面
         *   - 如果是在小程序环境中：直接返回
         *   - 如果是在 APP 环境中：跳转到外部浏览器打开页面
         * 2. 如果未指定 type 或 object.method 跳转方式，则按下面的规则进行跳转：
         *   - tabBar 页面则使用 switchTab 方式跳转
         *   - 非 tabBar 页面默认使用 navigateTo 方式跳转
         *   - 如果第一个参数是数字则使用 navigateBack 方式返回指定页数
         * @param {String} params string 类型时: 表示目标路径; number 类型时：表示返回的页面数; object 类型时: 表示跳转方法参数对象，object.method 可以指定跳转方式; number: 默认为返回的页面数
         * @param {String} type 跳转类型。
         */
        function route(params, type) {
            // 无效的目标地址
            if (!params) return;

            // 数字
            if (isNumber(params)) {
                params = {
                    delta: params
                };
                navigateBack(params);
                return;
            }

            // 字符串
            if (isString(params)) {
                params = {
                    url: params
                };
            }

            // params 中是否有 method
            if (params?.method) type = params.method;

            // type 是 navigateBack 但是没有 delta
            if (type === "navigateBack" && !params?.delta) {
                params.delta = 1;
            }

            // 1. 目标地址是一个绝对 URL
            if (isAbsoluteURL(params.url)) {
                // #ifdef H5
                window.open(params.url);
                // #endif

                // #ifdef MP
                // 啥都不用做
                // #endif

                // #ifdef APP
                plus.runtime.openURL(params.url);
                // #endif
            }

            // 指定了跳转方式
            if (type === "navigateTo") return navigateTo(params);
            if (type === "switchTab") return switchTab(params);
            if (type === "redirectTo") return redirectTo(params);
            if (type === "reLaunch") return reLaunch(params);
            if (type === "navigateBack") return navigateBack(params);

            // 目标页面是 tabBar 页面
            if (uniIsTabBar(params.url)) return switchTab(params);

            // 目标页面非 tabBar 页面
            navigateTo(params);
        }

        /**
         * 刷新当前页面
         */
        function refresh() {
            // 当前页面路径
            const pages = getCurrentPages();
            const page = pages[pages.length - 1];
            const currentPageFullPath = page?.$page?.fullPath;

            // 当前页面是 tabBar 页面
            if (uniIsTabBar()) {
                // 使用 reLaunch 实现刷新
                reLaunch(currentPageFullPath);
                return;
            }

            // 当前页面非 tabBar 页面
            // 使用 redirectTo 实现刷新
            redirectTo(currentPageFullPath);
        }

        /**
         * 路由跳转
         * @param {Object|String} params {Object|String} params 当是字符串时表示目标页面路径，当是对象时参数对象（通常和 uni-app 对应的路由方法的参数一致）
         * @param {String} type 跳转类型
         * @param {Number} delta 返回的页面数
         * @returns
         */
        function _routeTo(params = {}, type = "navigateTo") {
            // 组装参数对象
            if (isString(params)) {
                params = {
                    url: params
                };
            }

            // 页面不存在
            if (!uniIsPageExist(params?.url) && type !== "navigateBack") {
                console.error("页面不存在 ->", params);
                return;
            }

            // 跳转
            if (type === "navigateTo") uni.navigateTo(params);
            if (type === "redirectTo") uni.redirectTo(params);
            if (type === "reLaunch") uni.reLaunch(params);
            if (type === "switchTab") uni.switchTab(params);
            if (type === "navigateBack") uni.navigateBack(params);
        }

        app.mixin({
            onShow: (opts) => {
                // 因为 App 的 onShow 和页面的 onShow 都会触发，导致重复，所以就用这种方法处理一下咯~
                if (opts?.scene !== undefined) return;

                // 1. 调用后置路由拦截器函数
                if (isFunction(_config?.after)) {
                    _config.after(uniGetCurrentPageData());
                }

                // 2. 调用只执行一次的后置路由拦截器函数
                if (isFunction(_onceAfter)) {
                    _onceAfter(uniGetCurrentPageData());
                    _onceAfter = null;
                }
            }
        });

        uni.$hiRouter = {
            setConfig,
            navigateTo,
            to: navigateTo,
            redirectTo,
            redirect: redirectTo,
            reLaunch,
            launch: reLaunch,
            switchTab,
            tab: switchTab,
            navigateBack,
            back: navigateBack,
            refresh,
            route,
            go: route
        };
    }
};

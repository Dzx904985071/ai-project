import pagesJson from "@/pages.json";

/**
 * 验证数据是否是 String 类型数据
 * @param {Any} variable 要验证的数据
 * @returns {Boolean} true: 是 String 类型数据；false: 不是 String 类型数据；
 */
export const isString = (variable) => typeof variable === "string";

/**
 * 验证数据是否是 Number 类型数据
 * @param {Any} variable 要验证的数据
 * @returns {Boolean} true: 是 Number 类型数据；false: 不是 Number 类型数据；
 */
export const isNumber = (variable) => !Number.isNaN(variable) && typeof variable === "number";

/**
 * 验证数据是否是 Array 类型数据
 * @param {Any} variable 要验证的数据
 * @returns {Boolean} true: 是 Array 类型数据；false: 不是 Array 类型数据；
 */
export const isArray = (variable) => Array.isArray(variable);

/**
 * 验证数据是否是 Array 类型数据
 * Tips: 不包括数组、函数、null等
 * @param {Object} variable 要验证的数据
 * @returns {Boolean} true: 是 Object 类型数据；false: 不是 Object 类型数据；
 */
export const isObject = (variable) => {
    // 排除 null 和非对象类型
    if (variable === null || typeof variable !== "object") return false;

    // 使用 Object.prototype.toString.call 来获取变量的真实类型
    // 注意这里需要排除函数类型，因为函数在JavaScript中也是对象，但通常我们不希望将它们视为普通对象
    return Object.prototype.toString.call(variable) === "[object Object]";
};

/**
 * 验证数据是否是 Function 类型数据
 * @param {Any} variable 需要验证的数据
 * @returns {Boolean} true: 是Function 类型数据；false: 不是Function 类型数据；
 */
export const isFunction = (variable) => Object.prototype.toString.call(variable) === "[object Function]";

/**
 * 校验 URL 是否是绝对 URL
 * Tips: 如果 URL 以 “<scheme>：//” 或 “//”（协议相对URL）开头，则认为它是绝对的，RFC 3986 将方案名称定义为以字母开头的字符序列，然后是字母，数字，加号，句点或连字符的任意组合
 * @param {String} url 需要校验的 URL
 * @returns {Boolean} true: 是绝对 URL；false: 不是绝对 URL
 *
 */
export const isAbsoluteURL = (url = "") => /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);

/**
 * 深度合并两个对象
 * @param {Object} object1 对象一
 * @param {Object} object2 对象二
 * @returns {Object} 合并后的新对象数据，不影响原对象
 */
export function objectDeepMerge(object1, object2) {
    let merged = Object.assign({}, object1);
    for (let key in object2) {
        if (object2.hasOwnProperty(key)) {
            if (isObject(object2[key]) && !isArray(object2[key])) {
                if (isObject(merged[key]) && !isArray(merged[key])) {
                    merged[key] = objectDeepMerge(merged[key], object2[key]);
                } else {
                    merged[key] = Object.assign({}, object2[key]);
                }
            } else {
                merged[key] = object2[key];
            }
        }
    }
    return merged;
}

/**
 * 获取 URL 问号之前的部分
 * @param {String} url URL 字符串
 * @returns {String} 返回URL 主要部分（问号之前的部分）字符串
 */
export const urlGetMainPart = (url = "") => url.split("?")?.[0] || "";

/**
 * 获取所有在 pages.json 中定义的页面数据
 * Tips: 包含主包和所有分包
 * @returns {Array} 返回在 pages.json 中定义的页面数据，包含主包和所有分包
 */
export const uniGetPagesData = () => {
    // 返回的数据
    const pages = [];

    // 主包页面数据
    const mainPages = pagesJson?.pages || [];

    // 分包数据
    const subPackages = pagesJson?.subPackages || [];

    // 1. 先处理主包页面数据
    mainPages.forEach((page) => {
        // 为了统一，为主包和分包页面数据增加 fullPath 字段，表示开头为 "/" 的完整的（带分包根目录路径的）页面路径
        page.fullPath = `/${page.path}`;

        // 将页面数据添加到总页面数据中
        pages.push(page);
    });

    // 2. 再处理分包数据
    subPackages.forEach((subPackage) => {
        // 分包的根目录
        const root = subPackage?.root || "";

        // 分包中的页面数据
        const subPages = subPackage?.pages || [];

        // 处理分包中的页面数据
        subPages.forEach((subPage) => {
            // 为了统一，为主包和分包页面数据增加 fullPath 字段，表示开头为 "/" 的完整的（带分包根目录路径的）页面路径
            subPage.fullPath = `/${root}/${subPage.path}`;

            // 将页面数据添加到总页面数据中
            pages.push(subPage);
        });
    });

    // 最后返回总页面数据
    return pages;
};

/**
 * 获取在 pages.json 中定义的 TabBar 数据
 * @returns {Array} 返回在 pages.json 中定义的TabBar 数据
 */
export const uniGetTabBarData = () => pagesJson?.tabBar || [];

/**
 * 获取指定页面在 pages.json 中定义的数据
 * @param {String} url 指定页面URL
 * @returns {Object} 指定页面在 pages.json 中定义的数据
 */
export const uniGetPageData = (url = "") => {
    const pages = uniGetPagesData();
    const urlMainPart = urlGetMainPart(url);
    return pages.find((item) => urlMainPart === item?.fullPath || urlMainPart === `/${item?.fullPath}`);
};

/**
 * 获取当前页面在 pages.json 中定义的数据
 * @return {Object} 返回当前页面在 pages.json 中定义的数据
 */
export const uniGetCurrentPageData = () => {
    const pages = getCurrentPages();
    const page = pages[pages.length - 1];
    return uniGetPageData(page?.$page?.fullPath);
};

/**
 * 判断当前页面或指定页面路径对应的页面是否是 tabBar 页面
 * @param {String} pagePath 页面路径，如果该参数为空，那么判断当前页面是否是 tabBar 页面
 * @returns {Boolean} true: 是 tabBar 页面； false: 不是 tabBar 页面；
 */
export const uniIsTabBar = (pagePath = "") => {
    // TabBar 页面数据
    const tabBarList = uniGetTabBarData()?.list || [];

    // 1. 传入的参数值不为空
    if (pagePath) {
        // 传入的页面路径问号（?）之前的部分
        const urlMainPart = urlGetMainPart(pagePath);

        // 判断并返回该路径对应的页面是否是 tabBar 页面
        return tabBarList.find((item) => urlMainPart === item?.pagePath || urlMainPart === `/${item?.pagePath}`);
    }

    // 2. 传入的参数为空
    // 获取当前页面在 pages.json 中定义的数据
    const currentPageData = uniGetCurrentPageData();

    // 判断并返回当前页面是否是 tabBar 页面
    return tabBarList?.find((item) => `/${item.pagePath}` === currentPageData?.fullPath);
};

/**
 * 判断页面是否在 pages.json 中定义
 * @param {String} pagePath 页面路径
 * @returns {Boolean} true: 页面存在；false: 页面不存在；
 */
export function uniIsPageExist(pagePath) {
    if (!pagePath) return false;
    const urlMainPart = urlGetMainPart(pagePath);
    const pages = uniGetPagesData();
    return pages.find((item) => item.fullPath === urlMainPart || item.fullPath === `/${urlMainPart}`);
}

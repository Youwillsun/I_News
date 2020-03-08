export class DateMethod {
    /**
     * 时间比较 [ yyyy-mm-dd ]
     * @param targetDate 传入的目标时间
     */
    public static compare(targetDate: any) {
        // 拼接当前时间
        let nowDate = new Date();

        targetDate = new Date(Date.parse(targetDate));
        if (targetDate <= nowDate) {
            // 如果目标时间在当前时间之前
            return 'ok';
        }
    }

    /**
     * 数组根据日期排序
     * @param arr 数组
     * @param key 数组存储日期的key
     * @param order 顺序 pos=正序 rev=反序
     */
    public static dateSort(arr: any, key: string, order?: string) {
        arr.sort(function (a: { [x: string]: string; }, b: { [x: string]: string; }) {
            // 如果order排序规则没传，默认为正序
            if (order === undefined) {
                return Date.parse(a[key]) - Date.parse(b[key]);
            } else {
                if (order === 'rev') {
                    return Date.parse(b[key]) - Date.parse(a[key]);
                } else if (order === 'pos') {
                    return Date.parse(a[key]) - Date.parse(b[key]);
                } else {
                    throw new Error('错误值，order应为"pos"或者"rev"');
                }
            }
        });
    }
}
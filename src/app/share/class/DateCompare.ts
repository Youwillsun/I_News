export class DateCompare {
    /**
     * 时间比较 [ yyyy-mm-dd ]
     * @param targetDate 传入的目标时间
     */
    public static compare(targetDate: any) {
        // 拼接当前时间
        let date = new Date();
        // 年月日
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDay();
        // 拼接当前时间
        let nowDate: any = `${year}-${month}-${day}`;

        // 处理当前时间
        let nowTimeArr = nowDate.split("-");
        let nowTime = new Date(nowTimeArr[0], nowTimeArr[1], nowTimeArr[2]);
        let nowGetTime = nowTime.getTime();

        // 处理目标时间
        let targetTimeArr = targetDate.split("-");
        let targetTime = new Date(targetTimeArr[0], targetTimeArr[1], targetTimeArr[2]);
        let targetGetTime = targetTime.getTime();

        // 时间比较
        if (targetGetTime <= nowGetTime) {
            // 如果目标时间在当前时间之前
            return 'ok';
        }
    }
}
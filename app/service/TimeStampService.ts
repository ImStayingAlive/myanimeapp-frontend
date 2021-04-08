class TimeStampService {

    // Variables
    timestamps = {}

    // Is Available function
    isAvailable(key) {
        let time = this.timestamps[key];
        if(time != null || time !== undefined) {
            return Date.now() >= time;
        }
        return true;
    }

    // Set the Time Stamp
    setTimeStamp(key, time) {
        this.timestamps[key] = Date.now() + time;
    }

}

const timeStampService = new TimeStampService();
export default timeStampService
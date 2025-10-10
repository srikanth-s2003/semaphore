import moment from "moment";

const isZeroDate = (date: Date): boolean => {
  return moment(date).unix() == 0;
};

export const Formatter = {
  dateDiff: (durationStart: Date, durationEnd: Date): string => {
    if(isZeroDate(durationStart) || isZeroDate(durationEnd)) {
      return `N/A`;
    }

    const dateDiff = moment(durationStart).diff(moment(durationEnd));
    const duration = moment.duration(dateDiff);

    return duration.humanize(true);
  },

  dateDiffAge: (durationStart: Date, durationEnd: Date): string => {
    if(isZeroDate(durationStart) || isZeroDate(durationEnd)) {
      return `N/A`;
    }

    const dateDiff = moment(durationStart).diff(moment(durationEnd));
    const duration = moment.duration(dateDiff);

    return duration.humanize(false) + ` old`;
  },

  duration: (secs: number): string => {
    if(secs === 0) {
      return `N/A`;
    }

    if (secs >= 3600 * 24) {
      const fullDays = Math.floor(secs / (3600 * 24));
      const remainingHours = Math.floor((secs % (3600 * 24)) / 3600);
      const remainingMinutes = Math.floor((secs % 3600) / 60);
      const remainingSeconds = secs % 60;
      return `${fullDays}d ${remainingHours}h ${remainingMinutes}m ${remainingSeconds}s`;
    } else if (secs >= 3600) {
      const hours = Math.floor(secs / 3600);
      const minutes = Math.floor((secs % 3600) / 60);
      const seconds = secs % 60;
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (secs >= 60) {
      const minutes = Math.floor(secs / 60);
      const seconds = secs % 60;
      return `${minutes}m ${seconds}s`;
    } else {
      return `${secs}s`;
    }
  },

  percentage: (percentage: number): string => {
    return `${percentage}%`;
  },

  dailyRate: (total: number, days: number): string => {
    if(days == 0 || total == 0) {
      return `N/A`;
    }

    const dailyRate = total / days;

    if (dailyRate <= 1/30) {
      return `< 1/month`;
    }

    if (dailyRate >= 1/30 && dailyRate < 1/7) {
      return `${Math.round(dailyRate * 30)}/month`;
    }

    if (dailyRate >= 1/7 && dailyRate < 5/7) {
      return `${Math.round(dailyRate * 7)}/week`;
    }

    return `${Math.round(dailyRate)}/day`;
  },

  date: (date: Date): string => {
    return moment(date).utc().format(`DD MMM YYYY`);
  },

  dateTime: (date: Date): string => {
    return moment(date).utc().format(`DD MMM YYYY HH:mm:ss`);
  }
};

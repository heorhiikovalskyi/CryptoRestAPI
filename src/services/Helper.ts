class HelperService {
  public utcToMySqlLocal = (date: string): string => {
    const date_ = new Date(date);
    date_.setHours(date_.getHours() + 3);
    const mySqlDate = date_.toISOString().slice(0, 19).replace('T', ' ');
    return mySqlDate;
  };

  public timeStringToMinutes = (time: string): number => {
    const hIndex = time.indexOf('h');
    return hIndex > 0 ? +time.split('h')[0] * 60 : +time.split('m')[0];
  };
}

export default HelperService;

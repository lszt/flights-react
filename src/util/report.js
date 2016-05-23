import MovementReport from './MovementReport';

export function airstat(startDate, endDate) {
  return new Promise(resolve => {
    new MovementReport(startDate, endDate)
      .generate(download => {
        resolve(download);
      });
  });
}
import SpreadSheet = GoogleAppsScript.Spreadsheet.Spreadsheet;

const SHEET_ID = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
const DATE_COLUMN = 'A:E';
const target = new Date(2021, 5, 7);
const day = new Date(2021, 5, 7);

const days =[]; 
day.setDate(day.getDate() + 4);
days[0] = Utilities.formatDate(day, 'JST', 'YYYYMMdd');
day.setDate(day.getDate() + 1);
days[1] = Utilities.formatDate(day, 'JST', 'YYYYMMdd');
day.setDate(day.getDate() + 1);
days[2] = Utilities.formatDate(day, 'JST', 'YYYYMMdd');

Logger.log(`前日：${days[0]}　当日：${days[1]}　翌日：${days[2]}`);

const BEFORE_THE_DAY = days[0];
const ON_THE_DAY = days[1];
const AFTER_THE_DAY = days[2];

  const bot = () => {
    let ss: SpreadSheet = SpreadsheetApp.openById(SHEET_ID);
    let ssa = ss.getSheets()[0];
    let lastRow = ss.getLastRow();
    let data = ssa.getRange(DATE_COLUMN).getValues();

    // シートの休日データの日付型変換
    for (let i=1; i < lastRow; i++) {
      data[i][0] = Utilities.formatDate(data[i][0],'JST', 'YYYYMMdd');
    }

    // 分岐1:今日がアラートすべき日かどうか
    for (let i=1; i < lastRow; i++) {
      if (
          // 当日が國定假日であり、
          ON_THE_DAY === data[i][0] && data[i][2] === "是"
          // 前日が國定假日でない、つまり通知済みでなく
          && data[i - 1][0] !== BEFORE_THE_DAY
          // 当日以降が3連休以上になっている
          && data[i + 1][0] === AFTER_THE_DAY
         ) {
          day.setDate(day.getDate() - 1);
          Logger.log(day);


          Logger.log(`${ON_THE_DAY}から、は連休でアラートが必要です。`);

        break;
      } 
    }
  }


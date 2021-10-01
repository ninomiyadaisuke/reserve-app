import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom"
import reportWebVitals from './reportWebVitals';
import {MuiPickersUtilsProvider} from "@material-ui/pickers"
import Utils from "@date-io/dayjs"
import 'dayjs/locale/ja';
import dayjs, { Dayjs } from 'dayjs';
import {Routing} from "./components/Routing"

dayjs.locale("ja")

class ExtendedUtils extends Utils {
  getCalendarHeaderText(date: Dayjs) {
    return date.format('YYYY年 MMM');
  }

  getDateTimePickerHeaderText(date: Dayjs) {
    return date.format('M/D');
  }
}

ReactDOM.render(
  <React.StrictMode>
    <MuiPickersUtilsProvider utils={ExtendedUtils} locale="ja" >
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </MuiPickersUtilsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

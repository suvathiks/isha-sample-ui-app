import { SdkTableColumn, ColWidth } from './table.model';
import { minute, hour, day, week, month, year } from './table.constants';
import { SearchParams } from './table.model';

/**
 * Takes in column width of newly resized column and
 * stores it in localStorage
 * @param colWidth
 */
export const updateColumnWidth = (colWidth: ColWidth): void => {
    const table = colWidth.table;
    const colId = colWidth.colId;
    const newWidth = colWidth.width;
    if (newWidth) {
        let tableWidths = JSON.parse(localStorage.getItem(table));
        if (tableWidths) {
            tableWidths[colId] = newWidth;
        } else {
            tableWidths = {};
            tableWidths[colId] = newWidth;
        }
        tableWidths = JSON.stringify(tableWidths);
        localStorage.setItem(table, tableWidths);
    }
};

/**
 * Takes in tableId and columns object and sets
 * custom widths to the columns, if it exists,
 * and returns resized columns.
 * @param table Table Id
 * @param columns columnns object
 */
export const setColumnWidthsFromLocalStorage = (table: string, columns: SdkTableColumn[]): SdkTableColumn[] => {
    if (table) {
        const tableWidths = JSON.parse(localStorage.getItem(table));
        if (tableWidths) {
            const newColumns = columns.map(col => {
                const colWidth = tableWidths[col.field];
                if (colWidth) {
                    return { ...col, width: colWidth };
                } else {
                    return col;
                }
            });
            return newColumns;
        }
    } else {
        return columns;
    }
};

/**
 * Checks if custom widths exist in localStorage.
 * returns true if yes, false if no.
 * @param table unique table Id
 */
export const customWidthsExist = (table: string): boolean => {
    const tableWidths = JSON.parse(localStorage.getItem(table));
    if (tableWidths) {
        return true;
    } else {
        return false;
    }
};

export const parseDateTime = (dateTime: string) => {
    const months = ['Jan', 'Feb', 'Mar', 'apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const newDate = new Date(dateTime);
    const m = newDate.getMonth(); // returns 6 (note that this number is one less than the number of the month in isoformat)
    const d = newDate.getDate(); // returns 15
    const y = newDate.getFullYear(); // returns 2012
    const h = newDate.getHours();
    const min = newDate.getMinutes();

    // we get the text name of the month by using the value of m to find the corresponding month name
    const mlong = months[m];

    const fullDate = `${mlong} ${d} ${y}, ${h}:${min} Hrs`;
    return fullDate;
};

export const parseLastModified = (date: string) => {
    const currentDate = new Date();
    const modifiedDate = new Date(date);
    const secondsGone = Math.floor((currentDate.getTime() - modifiedDate.getTime()) / 1000);
    const hrt = humanReadableTime(secondsGone);
    return hrt;
};

const humanReadableTime = time => {
    if (time < 2 * minute) {
        return `moments ago`;
    } else if (time >= 2 * minute && time < hour) {
        return `${Math.ceil(time / minute)} mins ago`;
    } else if (time >= hour && time < 2 * hour) {
        return `1 hr ${Math.ceil((time - hour) / minute)} mins ago `;
    } else if (time >= 2 * hour && time < day) {
        return `${Math.ceil(time / hour)} hrs ${Math.ceil((time % hour) / minute)} mins ago`;
    } else if (time >= day && time <= 2 * day) {
        return `1 day ${Math.ceil((time - day) / hour)} hrs ago`;
    } else if (time >= 2 * day && time < week) {
        return `${Math.ceil(time / day)} days ago`;
    } else if (time >= week && time < month) {
        return `${Math.ceil(time / week)} weeks ago`;
    } else if (time >= month && time < year) {
        return `${Math.ceil(time / month)} months ago`;
    } else if (time >= year && time < 2 * year) {
        return `1 yr ${Math.ceil((time - year) / month)} months ago`;
    } else if (time >= 2 * year) {
        return `${Math.ceil(time / year)} yrs ago`;
    }
};

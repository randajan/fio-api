import { format, isValid, parseISO } from "date-fns";


const _regex = /^\d{4}-\d{2}-\d{2}$/;

export const toDateString = (date, throwError=true)=>{
    if (typeof date === 'string') {
        if (date.match(_regex)) { return date; }
        date = parseISO(date);
    }

    if (date instanceof Date && isValid(date)) {
        return format(date, 'yyyy-MM-dd');
    }

    if (throwError) { throw new Error('FIO neplatné datum nebo neplatný formát. Použijte formát "YYYY-MM-DD" nebo platnou instanci Date.'); }

}
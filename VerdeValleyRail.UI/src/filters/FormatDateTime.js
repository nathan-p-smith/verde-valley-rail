import dayjs from 'dayjs';

export function formatDateTime(value) {
    
    var dayjsValue = dayjs(value);    
    return dayjsValue.format('MMMM D, YYYY hh:mm a');

};

import { addMonths, addWeeks, format } from 'date-fns';
import { RecurrenceFrequency, type Event } from '@prisma/client';

export function expandEventInstances(event: Event) {
  if (!event.recurrenceEnabled || !event.recurrenceFreq) {
    return [{ id: event.id, title: event.title, start: event.startDateTime, area: event.area }];
  }

  const count = event.recurrenceCount ?? 8;
  const list = [];
  for (let i = 0; i < count; i += 1) {
    const start =
      event.recurrenceFreq === RecurrenceFrequency.WEEKLY
        ? addWeeks(event.startDateTime, i * (event.recurrenceInterval ?? 1))
        : addMonths(event.startDateTime, i * (event.recurrenceInterval ?? 1));

    list.push({
      id: `${event.id}-${i}`,
      title: event.title,
      start,
      area: event.area,
      recurringLabel: `${event.recurrenceFreq.toLowerCase()} • ${format(start, 'PPP p')}`
    });
  }
  return list;
}

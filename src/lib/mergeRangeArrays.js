/**
 * @description The function merges the range of hours of the dates if they overlap.
 * @param {String} dateOrHourRangeString
 * @returns String
 */
export const merge = (dateOrHourRangeString) => {
  if (dateOrHourRangeString.workingTime === "") return dateOrHourRangeString;
  if (dateOrHourRangeString.key === 8) {
    const ranges = dateOrHourRangeString.workingTime.split(";").map((range) =>
      range
        .trim()
        .split("-")
        .map((date) => new Date(date).getTime())
    );
    ranges.sort((a, b) => a[0] - b[0]);

    const result = combine(ranges);

    dateOrHourRangeString.workingTime = result
      .map((range) =>
        range
          .map((hour) => {
            const date = new Date(hour);
            return `${date.getFullYear()}/${
              date.getMonth() < 8
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1
            }/${date.getDate() < 9 ? "0" + date.getDate() : date.getDate()}`;
          })
          .join("-")
      )
      .join(" ; ");

    return dateOrHourRangeString;
  } else {
    const ranges = dateOrHourRangeString.workingTime.split(";").map((range) =>
      range
        .trim()
        .split("-")
        .map((hour) => parseInt(hour))
    );
    ranges.sort((a, b) => a[0] - b[0]);

    const result = combine(ranges);

    dateOrHourRangeString.workingTime = result
      .map((range) =>
        range.map((hour) => hour.toString().padStart(4, "0")).join("-")
      )
      .join(" ; ");
  }

  return dateOrHourRangeString;
};

const combine = (ranges) => {
  let result = [],
    last;

  ranges.forEach((r) => {
    if (!last || r[0] > last[1]) result.push((last = r));
    else if (r[1] > last[1]) last[1] = r[1];
  });
  return result;
};

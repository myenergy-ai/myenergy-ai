/**
 * Function to merge date and hour ranges into a single array.
 */
export const merge = (string) => {
  if (string.workingTime === "") return string;
  if (string.key === 8) {
    const ranges = string.workingTime.split(";").map((range) =>
      range
        .trim()
        .split("-")
        .map((date) => new Date(date).getTime())
    );
    ranges.sort((a, b) => a[0] - b[0]);

    const result = combine(ranges);

    string.workingTime = result
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

    return string;
  } else {
    const ranges = string.workingTime.split(";").map((range) =>
      range
        .trim()
        .split("-")
        .map((hour) => parseInt(hour))
    );
    ranges.sort((a, b) => a[0] - b[0]);

    const result = combine(ranges);

    string.workingTime = result
      .map((range) =>
        range.map((hour) => (hour < 1000 ? `0${hour}` : hour)).join("-")
      )
      .join(" ; ");
  }

  return string;
};

/**
 * Helper function for merging of date and hour
 */
const combine = (ranges) => {
  let result = [],
    last;

  ranges.forEach(function (r) {
    if (!last || r[0] > last[1]) result.push((last = r));
    else if (r[1] > last[1]) last[1] = r[1];
  });
  return result;
};

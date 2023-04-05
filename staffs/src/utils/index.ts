import { includes, isEmpty, pickBy } from "lodash";

export const pickForSearch = <T extends object>(
  params: T,
  fields: (keyof T)[]
) => {
  return <T>(
    pickBy(
      params,
      (value, key) => includes(fields, <keyof T>key) && !isEmpty(value)
    )
  );
};
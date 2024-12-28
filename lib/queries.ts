const api = "http://192.168.0.168:3003";

export const GET_ALL_WORKDAYS_BY_DATE = (str_date: string) => {
  return `${process.env.FASTAPI_URL}/api/v1/planner/get_by_str_date?str_date=${str_date}`;
};

export const GET_ALL_PLATFORMS_IN_SERVICE = `${api}/api/v1/platform/get_all_in_service`;

export const CREATE_WORK_PLAN = `${process.env.FASTAPI_URL}/api/v1/planner/create_work_plan`;

export const GET_ALL_WORK_PLANS_BY_WORK_DAY_ID = (id: string, date: string) => {
  return `${process.env.FASTAPI_URL}/api/v1/planner/get_work_plan_by?work_day_id=${id}&str_date=${date}`;
};

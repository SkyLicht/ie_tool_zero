const api = "http://10.13.33.107:3004";

export const GET_ALL_WORKDAYS_BY_DATE = (str_date: string) => {
  return `${process.env.FASTAPI_URL}/api/v1/planner/get_by_str_date?str_date=${str_date}`;
};

export const CREATE_WORK_PLAN = `${process.env.FASTAPI_URL}/api/v1/planner/create_work_plan`;

export const CREATE_LAYOUT = (line_id: string) =>
  `${process.env.FASTAPI_URL}/api/v1/layout/create_layout?line_id=${line_id}`;

export const GET_ALL_OPERATIONS_AREAS = `${process.env.FASTAPI_URL}/api/v1/layout/get_operations_areas`;

export const GET_LAYOUT_BY_ID = (id: string) => {
  return `${process.env.FASTAPI_URL}/api/v1/layout/get_layout_by_id?layout_id=${id}`;
};

export const GET_ALL_WORK_PLANS_BY_WORK_DAY_ID = (
  work_plan: string,
  str_date: string,
) => {
  return `${process.env.FASTAPI_URL}/api/v1/planner/get_work_plan_by?str_date=${str_date}&work_day_id=${work_plan}`;
};
export const GET_ALL_LINES = `${process.env.FASTAPI_URL}/api/v1/layout/get_lines`;

export const GET_STATIONS_BY_LAYOUT_ID = (id: string) => {
  return `${process.env.FASTAPI_URL}/api/v1/layout/get_stations_by_layout_id?layout_id=${id}`;
};

export const LineManagerRequest = () => {
  return {
    SERVER: {
      GET_LINE_BALANCES_BY_WEEK: (str_date: string) => {
        return `${process.env.FASTAPI_URL}/api/v1/line_balance/get_all_by_week?str_date=${str_date}`;
      },
      GET_LINE_BALANCE_BY_ID: (id: string) => {
        return `${process.env.FASTAPI_URL}/api/v1/line_balance/get_by_id?line_balance_id=${id}`;
      },
      CREATE_LINE_BALANCE: (str_date: string, line_id: string) => {
        return `${process.env.FASTAPI_URL}/api/v1/line_balance/create?str_date=${str_date}&line_id=${line_id}`;
      },
    },
  };
};

export const GET_ALL_LAYOUTS = `${process.env.FASTAPI_URL}/api/v1/layout/get_layouts`;
// client

export const UPDATE_LAYOUT = `${api}/api/v1/layout/update_layout`;
export const GET_ALL_PLATFORMS_IN_SERVICE = `${api}/api/v1/platform/get_all_in_service`;

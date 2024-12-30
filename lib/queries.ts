const api = "http://192.168.0.168:3003";

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

export const GET_ALL_WORK_PLANS_BY_WORK_DAY_ID = (id: string) => {
  return `${process.env.FASTAPI_URL}/api/v1/layout/get_layout?layout_id=${id}`;
};
export const GET_ALL_LINES = `${process.env.FASTAPI_URL}/api/v1/layout/get_lines`;
export const GET_STATIONS_BY_LAYOUT_ID = (id: string) => {
  return `${process.env.FASTAPI_URL}/api/v1/layout/get_stations_by_layout_id?layout_id=${id}`;
};

export const GET_ALL_LAYOUTS = `${process.env.FASTAPI_URL}/api/v1/layout/get_layouts`;
// client

export const UPDATE_LAYOUT = `${api}/api/v1/layout/update_layout`;
export const GET_ALL_PLATFORMS_IN_SERVICE = `${api}/api/v1/platform/get_all_in_service`;

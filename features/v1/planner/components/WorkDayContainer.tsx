import WorkPlansContainer from "@/features/v1/planner/components/WorkPlansContainer";
import WorkDayAddWorkPlan from "@/features/v1/planner/components/forms/WorkDayAddWorkPlan";
import { WorkDayModel } from "@/features/types/work-day";

const WorkDayContainer = ({ record }: { record: WorkDayModel }) => {
  return (
    <li
      className={
        "w-[300px] h-fit min-w-[270px] min-h-[300px] flex flex-col rounded-xl surface_container "
      }
    >
      <div className="w-full flex flex-row items-center justify-center gap-2 font-semibold">
        <h2>{record.line.factory.name}</h2>
        <h2>{record.line.name}</h2>
      </div>

      <div className="h-fit   flex flex-col gap-2">
        <WorkDayAddWorkPlan
          work_day_id={record.id}
          str_date={record.str_date}
          line_id={record.line.id}
        />
        <div className="h-fit  flex justify-center ">
          <WorkPlansContainer
            work_day_id={record.id}
            str_date={record.str_date}
          />
        </div>
      </div>
    </li>
  );
};

export default WorkDayContainer;

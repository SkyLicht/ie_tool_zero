import { WorkDay } from "@/types/planner";
import WorkDayContainer from "@/features/v1/planner/components/WorkDayContainer";

type Props = {
  data: WorkDay[];
};
const WorkDaysContainer = ({ data }: Props) => {
  return (
    <section className="w-fit flex flex-1 border border-white">
      <ul className={"w-fit grid grid-cols-4 gap-2 "}>
        {data.map((record, index) => (
          <WorkDayContainer key={index} record={record} />
        ))}
      </ul>
    </section>
  );
};

export default WorkDaysContainer;

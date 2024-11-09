import { Skeleton } from "@/components/ui/skeleton";
import PropTypes from "prop-types";
export default function CustomSkeleton({ times = 1 }) {
  let skeleton = [];
  for (let i = 0; i < times; i++) {
    skeleton.push(
      <div key={i} className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>,
    );
  }
  return <>{skeleton.map((skeletonItem) => skeletonItem)}</>;
}
CustomSkeleton.propTypes = {
  times: PropTypes.number,
};

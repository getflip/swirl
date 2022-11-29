import { Prop } from "@swirl/lib/components/src/components.model";
import { FunctionComponent } from "react";

interface PropsTableProps {
  componentPropsData: Prop[];
}

export const PropsTable: FunctionComponent<PropsTableProps> = ({
  componentPropsData,
}) => {
  return (
    <table className="mb-10 w-full">
      <thead>
        <tr className="grid gap-2 grid-cols-4 border-b-1 pb-4">
          <th className="col-span-2 font-semibold text-start">Prop</th>
          <th className="col-span-2 font-semibold text-start">Type</th>
        </tr>
      </thead>
      <tbody>
        {componentPropsData.map((prop: Prop) => (
          <tr
            key={prop.name}
            className="grid grid-cols-4 py-4 border-b-1 items-start"
          >
            <td className="col-span-2">
              {prop.name}
              {prop.required && <span className="text-red-600">*</span>}
            </td>
            <td className="col-span-2">
              <code className="bg-gray-100 rounded-md p-1 text-sm font-font-family-code">
                {prop.type}
              </code>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

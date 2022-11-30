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
        <tr className="grid gap-2 grid-cols-3 border-b-1 pb-4">
          <th className="font-semibold text-start">Prop</th>
          <th className="font-semibold text-start">Type</th>
          <th className="font-semibold text-start">Default Value</th>
        </tr>
      </thead>
      <tbody>
        {componentPropsData.map((prop: Prop) => (
          <tr
            key={prop.name}
            className="grid grid-cols-3 py-4 border-b-1 items-start"
          >
            <td>
              {prop.name}
              {prop.required && <span className="text-red-600">*</span>}
            </td>
            <td>
              <code className="bg-gray-100 rounded-md p-1 text-sm font-font-family-code">
                {prop.type}
              </code>
            </td>
            <td>
              <code className="bg-gray-100 rounded-md p-1 text-sm font-font-family-code">
                {prop.default ? prop.default : "none"}
              </code>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

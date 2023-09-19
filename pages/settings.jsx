import { useUser } from "../store/commonFunctions";
import { SettingsForm } from "../components/htmlblock";

function Settings() {
  const { user } = useUser({ redirectTo: "/" });
  return (
    <div className="w-full h-full flex flex-col overflow-hidden px-[20px] pt-[80px] gap-[30px]">
      <SettingsForm
        title="פרטים אישיים"
        inputs={[
          { name: "שם מלא", value: user && user.name, type: "static" },
          { name: "אימייל", value: user && user.email, type: "edit" },
          { name: "מספר טלפון", value: user && user.phone, type: "edit" },
        ]}
      />
      <SettingsForm
        title="דרכי אימות"
        inputs={[
          {
            name: "שליחת אימות אל",
            value: user && user.verifmethod,
            type: "drop",
          },
        ]}
      />
      {user && user.usage === "business" && (
        <SettingsForm
          title="יומן"
          inputs={[
            { name: "הפסקות קבועות", value: "ללא", type: "static" },
            {
              name: "שעות התחלה קבועות",
              value: user.ownedstores[user.selectedStoreIndex].options.start,
              type: "time",
            },
            {
              name: "שעות סיום קבועות",
              value: user.ownedstores[user.selectedStoreIndex].options.end,
              type: "time",
            },
          ]}
        />
      )}
    </div>
  );
}

export default Settings;

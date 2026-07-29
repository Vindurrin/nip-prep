import type { StudyModule } from "../types/study";

type Props = {
  modules: StudyModule[];
  activeModuleId: string;
  onSelect: (moduleId: string) => void;
};

export function ModuleNav({ modules, activeModuleId, onSelect }: Props) {
  return (
    <section className="moduleGrid" aria-label="Study modules">
      {modules.map((module) => (
        <button
          key={module.id}
          className={activeModuleId === module.id ? "module active" : "module"}
          onClick={() => onSelect(module.id)}
          type="button"
        >
          <span>{module.title}</span>
          <small>{module.focus}</small>
        </button>
      ))}
    </section>
  );
}

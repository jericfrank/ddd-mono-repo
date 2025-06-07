import { Modules, createModule } from './modules';

let modules: Modules;

export async function init(): Promise<void> {
  modules = await createModule();
}

export function getModules(): Modules {
  return modules;
}

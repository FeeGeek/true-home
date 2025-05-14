import {
  MyHomePlugin,
  MyHomePluginProperties,
} from '../entities/my-home-plugin.entity';

export interface MyHomePluginReadRepoPort {
  getMyHomePluginById(id: string): Promise<MyHomePluginProperties | null>;
}

export interface MyHomePluginWriteRepoPort {
  createMyHomePlugin(command: MyHomePlugin): Promise<void>;
  updateMyHomePlugin(command: MyHomePlugin): Promise<void>;
  deleteMyHomePlugin(id: string): Promise<void>;
}

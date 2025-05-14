import {
  MyHomePluginInstance,
  MyHomePluginInstanceProperties,
} from '../entities/my-home-plugin-instance.entity';

export interface MyHomePluginInstanceReadRepoPort {
  getMyHomePluginInstanceById(
    id: string,
  ): Promise<MyHomePluginInstanceProperties | null>;
  findMyHomePluginInstanceByUserId(
    userId: string,
  ): Promise<MyHomePluginInstanceProperties[] | null>;
  findMyHomePluginInstanceByUsername(
    username: string,
  ): Promise<MyHomePluginInstanceProperties[] | null>;
}

export interface MyHomePluginInstanceWriteRepoPort {
  createMyHomePluginInstance(command: MyHomePluginInstance): Promise<void>;
  updateMyHomePluginInstance(command: MyHomePluginInstance): Promise<void>;
  deleteMyHomePluginInstance(id: string): Promise<void>;
}

/** The storage namespace */
declare namespace Plugin {
  type JSONSerializable =
    | string
    | number
    | boolean
    | null
    | JSONSerializable[]
    | { [key: string]: JSONSerializable }
    | { [key: string]: any };

  interface BasePlugin<T extends JSONSerializable = JSONSerializable> {
    id: string;
    name: string;
    version: string;
    componentName: string;
    meta: T;
  }

  namespace Table {
    interface Column {
      key: string;
      title: string;
      width?: string;
      align?: string;
    }
  }

  namespace Component {
    interface BaseTable<T = JSONSerializable> {
      title: string;
      list: T[];
      columns: Table.Column[];
      containerClass?: string;
      headerClass?: string;
      tableClass?: string;
    }
  }
}

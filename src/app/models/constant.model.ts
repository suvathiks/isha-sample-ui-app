export class ConstantType {
  active: 0 | 1;
  constantType: string;
  constantTypeCode: string;
  description: string;
}

export class ConstantValue {
  active: 0 | 1;
  constant: string;
  constantCode: string;
  constantTypeCode: string;
  description: string;
  modifiedAt: string;
  ownerId: number;
  rowKey: string;
}

import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { Rule } from 'antd/lib/form';

export type PacifyFormData = {
	size: SizeType;
	name: string;
	formItems: PacifyFormItem[];
	submitName?: string;
};

export type PacifyFormItem = {
	label?: string;
	name: string;
	rules?: Rule[];
	type?: 'string' | 'custom';
};

// type Parent<K extends string> = {
//     children: Child<K>[]
//  }

//  type Child<K extends string> = {
//     label: K
//  }

//    function Parent<K extends string>(parent: Parent<K>) {
//     return parent;
//   }

// const p1 = Parent({
//     children: [
//         { label: 'label1' },
//         { label: 'label4' }
//     ]
//  })

//  type Labels<P extends Parent<any>> = P extends Parent<infer K>
//   ? { [Key in K]: string } : never;

// type Labels1 = Labels<typeof p1>;

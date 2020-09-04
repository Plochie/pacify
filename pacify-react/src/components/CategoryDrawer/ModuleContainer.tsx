import { FileOutlined } from '@ant-design/icons';
import React from 'react';
import { Subject } from 'rxjs';
import { PacifyModule } from 'src/entities';
import './CategoryDrawer.scss';

export const moduleClickedSubject = new Subject<PacifyModule>();

export function ModuleContainer({ module }: { module: PacifyModule }) {
	// module container

	const onClick = (e: React.MouseEvent) => {
		moduleClickedSubject.next(module);
	};

	return (
		<div className="module-container" onClick={onClick}>
			<FileOutlined style={{ padding: 5, fontSize: '12px' }} />
			<span style={{ flexGrow: 1, fontSize: '10px' }}>
				<strong>{module.title}</strong>
			</span>
		</div>
	);
}

export class DataHolder {
	private static instance: DataHolder = new DataHolder();

	static getInstance(): DataHolder {
		return DataHolder.instance;
	}
}

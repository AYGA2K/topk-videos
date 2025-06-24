export type video = {
	id: string;
	name: string;
	count: number;
};
export class MinHeap {
	private readonly data: video[] = [];
	private readonly idToIndex = new Map<string, number>(); // Index per video ID

	public has(id: string): boolean {
		return this.idToIndex.has(id);
	}
	public push(item: video): void {
		this.data.push(item);
		this.idToIndex.set(item.id, this.data.length - 1);
		this.bubbleUp(this.data.length - 1);
	}

	public pop(): video | undefined {
		if (this.data.length === 0) return undefined;

		const top = this.data[0];
		this.idToIndex.delete(top.id);

		const last = this.data.pop()!;
		if (this.data.length > 0) {
			this.data[0] = last;
			this.idToIndex.set(last.id, 0);
			this.bubbleDown(0);
		}

		return top;
	}

	public peek(): video | undefined {
		return this.data[0];
	}

	public size(): number {
		return this.data.length;
	}

	public isEmpty(): boolean {
		return this.data.length === 0;
	}

	public updateCount(id: string, newCount: number): void {
		const index = this.idToIndex.get(id);
		if (index === undefined) return;

		this.data[index].count += newCount;
	}

	private bubbleUp(index: number): void {
		while (index > 0) {
			const parentIndex = Math.floor((index - 1) / 2);
			if (this.compare(this.data[index], this.data[parentIndex]) >= 0) break;

			this.swap(index, parentIndex);
			index = parentIndex;
		}
	}

	private bubbleDown(index: number): void {
		const length = this.data.length;
		while (true) {
			const left = 2 * index + 1;
			const right = 2 * index + 2;
			let smallest = index;

			if (
				left < length &&
				this.compare(this.data[left], this.data[smallest]) < 0
			) {
				smallest = left;
			}
			if (
				right < length &&
				this.compare(this.data[right], this.data[smallest]) < 0
			) {
				smallest = right;
			}
			if (smallest === index) break;

			this.swap(index, smallest);
			index = smallest;
		}
	}

	private swap(i: number, j: number): void {
		// Update idToIndex before swapping
		this.idToIndex.set(this.data[i].id, j);
		this.idToIndex.set(this.data[j].id, i);

		// Swap data
		[this.data[i], this.data[j]] = [this.data[j], this.data[i]];
	}

	private compare(a: video, b: video): number {
		return a.count - b.count;
	}
}

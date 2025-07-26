interface FirebaseTimestamp {
	_seconds: number;
	_nanoseconds: number;
}

/**
 * Utility functions for transforming Firebase data structures to MongoDB format
 */
export class FirebaseTransformer {
	/**
	 * Converts Firebase timestamp to JavaScript Date object
	 * @param timestamp Firebase timestamp with _seconds and _nanoseconds
	 * @returns Date object or undefined if timestamp is invalid
	 */
	static timestampToDate(timestamp: FirebaseTimestamp | undefined): Date | undefined {
		if (!timestamp || typeof timestamp._seconds !== 'number') {
			return undefined;
		}

		// Convert seconds to milliseconds and add nanoseconds as milliseconds
		const milliseconds = timestamp._seconds * 1000 + Math.floor((timestamp._nanoseconds || 0) / 1000000);
		return new Date(milliseconds);
	}

	/**
	 * Safely converts any Firebase timestamp field to Date
	 * @param value Any value that might be a Firebase timestamp
	 * @returns Date object or the original value if not a timestamp
	 */
	static safeTimestampToDate(value: any): any {
		if (value && typeof value === 'object' && '_seconds' in value) {
			return this.timestampToDate(value);
		}
		return value;
	}

	/**
	 * Transforms an object recursively, converting any Firebase timestamps to Dates
	 * @param obj Object to transform
	 * @returns Transformed object with Date objects instead of Firebase timestamps
	 */
	static transformTimestamps(obj: any): any {
		if (!obj || typeof obj !== 'object') {
			return obj;
		}

		if (Array.isArray(obj)) {
			return obj.map(item => this.transformTimestamps(item));
		}

		const transformed: any = {};
		for (const [key, value] of Object.entries(obj)) {
			transformed[key] = this.safeTimestampToDate(value);
		}

		return transformed;
	}
}
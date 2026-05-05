type DataSource = 'remote' | 'local';

type LogMetadata = {
  source: DataSource;
  operation: string;
  input?: unknown;
};

export function logInfo(message: string, metadata?: unknown) {
  console.log(`[INFO] ${message}`, metadata ?? '');
}

export function logError(message: string, error?: unknown) {
  console.log(`[ERROR] ${message}`, error ?? '');
}

export async function logRepositoryOperation<T>(
  metadata: LogMetadata,
  operation: () => Promise<T>
): Promise<T> {
  logInfo(`${metadata.source.toUpperCase()} START: ${metadata.operation}`, metadata.input);

  try {
    const result = await operation();

    logInfo(`${metadata.source.toUpperCase()} SUCCESS: ${metadata.operation}`, result);

    return result;
  } catch (error) {
    logError(`${metadata.source.toUpperCase()} ERROR: ${metadata.operation}`, error);
    throw error;
  }
}
export async function hello(event: any) {
  return {
    message: 'Hello World!',
    input: event,
  };
}

import Cookies from 'universal-cookie';

const cookies = new Cookies();


class CookieService {
  // get
  get(name: string): string {
    return cookies.get(name);
  }
  // set
  set(name: string, value: string | number, options?: { [key: string]: string | number | Date }): void {
    cookies.set(name, value, { ...options })
  }
  // remove
  remove(name: string, options?: { [key: string]: string | number }): void {
    cookies.remove(name, { ...options })
  }
}
/// to create only one instance [like static class]
export default new CookieService();
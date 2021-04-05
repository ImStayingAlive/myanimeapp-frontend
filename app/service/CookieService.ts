import Cookies from "universal-cookie"
const cookies = new Cookies();

class CookieService {

    removeCookie(key: string) {
        cookies.remove(key, { path: '/' })
    }

    setCookie(key: string, value: string, age: number = -1) {
        if (age == -1) {
            cookies.set(key, value, {path: "/"})
            return;
        }

        cookies.set(key, value, {path: "/", maxAge: age})
    }

    existsCookie(key: string) {
        let cookie = cookies.get(key);
        return !!cookie;
    }

    getCookie(key: string) {
        return cookies.get(key);
    }
}

const cookieService = new CookieService();
export default cookieService;
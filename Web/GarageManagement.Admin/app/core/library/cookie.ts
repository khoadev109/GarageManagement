import Cookies from 'universal-cookie';

const cookies = new Cookies();

export class Cookie {    
    public static getCookie(cname: string): string{
        return cookies.get(cname) || "";
    }

    public static setCookie(cname, cvalue, exseconds) {
        var d = new Date();
        d.setTime(d.getTime() + (exseconds*1000));
        cookies.set(cname, cvalue, { path: '/', expires: d });
    }

    public static deleteCookie(cname)
    {
        cookies.remove(cname);          
    }
}

import { Injectable } from '@angular/core';
import { parseString } from 'xml2js';

@Injectable({
  providedIn: 'root'
})
export class Xml2jsonService {
  json: string;

  constructor() { }

  // parse le xml d'entrée en json
  parseXML(xmldata: string) {
    parseString(xmldata, (err: any, results: any) => { this.json = JSON.stringify(results) });
    return this.json;
  }

}

import { Component } from '@angular/core';
import { JsonPipe, AsyncPipe } from '@angular/common'
import { NgxScannerQrcodeComponent, LOAD_WASM, ScannerQRCodeConfig, ScannerQRCodeResult } from 'ngx-scanner-qrcode';

LOAD_WASM('assets/wasm/ngx-scanner-qrcode.wasm').subscribe();


@Component({
  selector: 'qrcode',
  imports: [NgxScannerQrcodeComponent, JsonPipe, AsyncPipe],
  templateUrl: './qrcode.html',
})

export class qrcode {
  //This exports a variable of a type ScannerQRCodeConfig
  //This is then imported in the .html file too
  public config: ScannerQRCodeConfig = {
    isBeep: false,
    fps: 500, //Scan rate in milliseconds 1000 = 1 can per second
  };

  //Events must also be tied in the .html file
  public async onEvent(e: ScannerQRCodeResult[], action?: any): Promise<void> {
    const readValue = e[0].value;
    console.log(readValue);

    //Free code down here
    //This is the part that will GET data from the database

    const params = new URLSearchParams();
    params.append("id", readValue);

    const response = await fetch(`http://127.0.0.1:3333/?${params}`)
      .then(res => res.json())
      .then(res => {
        console.log(res)

        let caller = document.getElementById("notif");

        if (res.Verified == true) {

          if (caller != null) {

            const msg = document.createElement("div");
            msg.textContent = "Verified!";
            msg.style.color = "#4aff9b";
            msg.style.fontSize = "48px";
            msg.style.fontWeight = "bold";
            msg.style.letterSpacing = "1px";
            caller.appendChild(msg);
            setTimeout(() => {
              caller.removeChild(msg);
            }, 500);
          }

        }
        else {

          if (caller != null) {

            const msg = document.createElement("div");
            msg.textContent = "NOT Verified!";
            msg.style.color = "#ff4a4a";
            msg.style.backgroundColor = "#fff04acf";
            msg.style.fontSize = "48px";
            msg.style.fontWeight = "bold";
            msg.style.letterSpacing = "2px";
            msg.style.margin = "auto";

            caller.appendChild(msg);
            setTimeout(() => {
              caller.removeChild(msg);
            }, 1500);
          }

        }
      });;
  }
}


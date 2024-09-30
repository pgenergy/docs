---
title: SML Protocol
description: SML protocols for smart meter that are supported
sidebar:
  order: 10
---
This documentation provides detailed information on the SML protocols and smart meters supported by our app.
The page categorizes SML protocols by producer and model number, enabling easy reference and efficient integration.

## ISKRA
---
### MT176 / MT175
```
>D
>B
->sensor53 r
>M 1
+1,3,s,16,9600,MT175
1,77070100010800ff@1000,E_in,kWh,ENERGYLEAF_KWH,4
1,77070100020800ff@1000,E_out,kWh,ENERGYLEAF_OUT,4
1,77070100100700ff@1,P,W,ENERGYLEAF_CURRENT,4
#
```

### MT691
```
>D
>B
=>sensor53 r
>M 1
+1,3,s,0,9600,MT691
1,77070100100700ff@1,Verbrauch aktuell,W,ENERGYLEAF_CURRENT,4
1,77070100010800ff@1000,Verbrauch gesamt,kWh,ENERGYLEAF_KWH,4
1,77070100020800ff@1000,Einspeisung gesamt,kWh,ENERGYLEAF_OUT,4
#
```

### MT681
```
>D
>B
=>sensor53 r
>M 1
+1,3,s,0,9600,MT681
1,77070100010800ff@1000,Total Consumed,kWh,ENERGYLEAF_KWH,4
1,77070100100700ff@1,Current Consumption,W,ENERGYLEAF_CURRENT,4
1,77070100020800ff@1000,Total Delivered,kWh,ENERGYLEAF_OUT,4
#
```

### MT631
```
>D
>B
=>sensor53 r
>M 1
+1,3,s,0,9600,MT631
1,77070100010800ff@1000,Total Consumed,kWh,ENERGYLEAF_KWH,4
1,77070100020800ff@1000,Total Delivered,kWh,ENERGYLEAF_OUT,4
1,77070100100700ff@1,Current Consumption,W,ENERGYLEAF_CURRENT,4
#
```

## EMH
---
### eBZD
```
>D
>B
->sensor53 r
>M 1
+1,3,s,0,9600,Main
1,77070100100700ff@1,Power,W,ENERGYLEAF_CURRENT,4
1,77070100010800ff@1000,Total Consumed,kWh,ENERGYLEAF_KWH,4
1,77070100020800ff@1000,Total Feed,kWh,ENERGYLEAF_OUT,4
#
```

### eHZ Generation K
```
>D
>B

=>sensor53 r
>M 1
+1,3,s,0,9600,
1,77070100010800ff@1000,Total consumption,kWh,ENERGYLEAF_KWH,4
1,77070100020800ff@1000,Total feed-in,kWh,ENERGYLEAF_OUT,4
1,77070100100700ff@1,Power,W,ENERGYLEAF_CURRENT,4
#
```

### ED300L
```
>D    
>B   
->sensor53 r  
>M 2  
+1,3,s,0,9600,Haus  
1,770701000F0700FF@1,Aktuell,W,ENERGYLEAF_CURRENT,4
1,77070100010800FF@1000,Zählerstand Verb.,kWh,ENERGYLEAF_KWH,4
1,77070100020800FF@1000,Zählerstand Einsp.,kWh,ENERGYLEAF_OUT,4
```

### ED300S
```
>D
>B
->sensor53 r
>M 1
+1,3,s,0,9600,Main
1,77070100100700ff@1,Power,W,ENERGYLEAF_CURRENT,4
1,77070100010800FF@1000,Counter,kWh,ENERGYLEAF_KWH,4
#
```

### mMe4.0
```
>D
>B
->sensor53 r
>M 1
+1,3,s,0,9600,Main,1,10
1,77070100010800FF@1000,Total Consumed,kWh,ENERGYLEAF_KWH,4
1,77070100020800FF@1000,Total Feed,kWh,ENERGYLEAF_OUT,4
1,77070100100700FF@1,Power,W,ENERGYLEAF_CURRENT,4
#
```

## LOGAREX
---
### LK11BL (OBIS)
```
>D
>B
=>sensor53 r
>M 1
+1,3,o,0,9600,LK1311BE,13,30,2F3F210D0A,063035310D0A
1,1-0:1.8.0*255(@1,Gesamtverbrauch,kWh,ENERGYLEAF_KWH,4
1,1-0:16.7.0*255(@1,Verbrauch aktuell,W,ENERGYLEAF_CURRENT,4
#
```

### Logarex LK13BE (SML) (LK13BE904639)
```
>D
>B
=>sensor53 r
>M 1
+1,3,s,0,9600,LK13BE,1,10,2F3F210D0A,063035310D0A
1,77070100010800ff@1000,Energie gesamt,kWh,ENERGYLEAF_KWH,4
1,77070100020800ff@1000,Einspeisung,kWh,ENERGYLEAF_OUT,4
1,77070100100700ff@1,Leistung,W,ENERGYLEAF_CURRENT,4
#
```

### Logarex LK13BE (SML) (e.g. LK13BE6067x9)
```
>D
>B
->sensor53 r
>M 1
+1,3,s,0,9600,LK13BE,1,10,2F3F210D0A,063035310D0A
1,77070100010800ff@1000,Gesamt kWh bezogen,kWh,ENERGYLEAF_KWH,4
1,77070100020800ff@1000,Gesamt kWh geliefert,kWh,ENERGYLEAF_OUT,4
1,77070100100700ff@1,Verbrauch aktuell,W,ENERGYLEAF_CURRENT,4
#
```

## efr
---
### SGM-C2 / C4 / D4
```
>D
>B
->sensor53 r
>M 1
+1,3,s,16,9600,ENERGY
1,77070100010800ff@1000,Comsumption,kWh,ENERGYLEAF_KWH,4
1,77070100100700ff@1,Actual Power,W,ENERGYLEAF_CURRENT,4
#
```

## Apator
---
### Norax 3D+
```
>D
>B
->sensor53 r
>M 1
+1,3,s,1,9600,SML
1,77070100010800ff@1000,Total consumption,kWh,ENERGYLEAF_KWH,4
1,77070100020800ff@1000,Total Feed,kWh,ENERGYLEAF_OUT,4
1,77070100100700ff@1,Current consumption,W,ENERGYLEAF_CURRENT,4
#
```

### Picus eHZ.060.D/J 
```
>D
>B
=>sensor53 r
>M 1
+1,3,s,0,9600,PICUS
1,77070100100700ff@1,Consumption (Current),W,ENERGYLEAF_CURRENT,4
1,77070100010800ff@1000,Consumption (Total),Kwh,ENERGYLEAF_KWH,4
1,77070100020800ff@1000,feed (Total),Kwh,ENERGYLEAF_OUT,4
#
```

### Norax 3D
```
>D
>B
->sensor53 r
>M 1
+1,3,s,1,9600,SML
1,77070100010800ff@1000,Total consumption,kWh,ENERGYLEAF_KWH,4
1,77070100020800ff@1000,Total Feed,kWh,ENERGYLEAF_OUT,4
1,77070100100700ff@1,Current consumption,W,ENERGYLEAF_CURRENT,4
#
```

## Landis
---
### +Gyr E220
```
>D
>B
=>sensor53 r
;Set teleperiod to 20sec  
tper=10  
>M 1
+1,3,s,0,9600,Power
1,77070100010800ff@1000,Verbrauch,kWh,ENERGYLEAF_KWH,4
1,77070100100700ff@1,Leistung-akt.,W,ENERGYLEAF_CURRENT,4
#
```

### +Gyr E320
```
>D
>B
=>sensor53 r
>M 1
+1,3,s,20,9600,E320
1,77070100020800ff@1000,Total Delivered,kWh,ENERGYLEAF_OUT,4
1,77070100010800ff@1000,Total Consumed,kWh,ENERGYLEAF_KWH,4
1,77070100100700ff@1,Current power,W,ENERGYLEAF_CURRENT,4
#
```

### +Gyr E350
```
>D
scnt=0
res=0

>B
->sensor53 r
tper=20

>F
scnt+=1
switch scnt
case 6
res=sml(1 0 300)
res=sml(1 1 "2F3F210D0A")

case 18
res=sml(1 1 "063035300D0A")

case 20
res=sml(1 0 9600)

case 50
scnt=0
ends

>M 1
+1,3,o,0,9600,,1
1,1.8.0(@1,Total Consumed,kWh,ENERGYLEAF_KWH,4
1,16.7(@1,Current power,kW,ENERGYLEAF_CURRENT,4
#
```

## ZPA
---
### GH302
```

```

### GH305
```
>D
>B
->sensor53 r
>M 1
+1,3,s,0,9600,SML
1,77070100010800ff@1000,Total Verbrauch,kWh,ENERGYLEAF_KWH,4
1,77070100020800ff@1000,Total Einspeisung,kWh,ENERGYLEAF_OUT,4
1,77070100100700ff@1,Actual load,W,ENERGYLEAF_CURRENT,4
#
```

## ELSTER / Honeywell
---
### AS2020 / AS2018
```
>D
>B
->sensor53 r
>M 1
+1,3,s,0,9600,,1
1,77070100010800ff@1000,Total Consumed,kWh,ENERGYLEAF_KWH,4
1,77070100020800ff@1000,Total Delivered,kWh,ENERGYLEAF_OUT,4
1,77070100100700ff@0.1,Current Consumption,W,ENERGYLEAF_CURRENT,4
#
```

## Hager
---
### EHZ161 / EHZ361
```
>D
>B
->sensor53 r
>M 1
+1,3,o,0,9600,OBIS
1,1-0:1.8.0*255(@1,Power Consumption A+,kWh,ENERGYLEAF_KWH,4
1,1-0:2.8.0*255(@1,Power Feed A-,kWh,ENERGYLEAF_OUT,4
#
```

### EHZ363
```
>D
>B
->sensor53 r
>M 1
+1,3,s,0,9600,SML
1,77070100010800ff@1000,Total consumption,kWh,ENERGYLEAF_KWH,4
1,77070100020800ff@1000,Total Feed,kWh,ENERGYLEAF_OUT,4
1,77070100100700ff@1,Current consumption,W,ENERGYLEAF_CURRENT,4
#
```

## KAIFA
---
### MB310H4BDE
```
>D
>B
=>sensor53 r
>M 1
+1,3,s,0,9600,Haus
1,77070100010800ff@1000,Zaehlerstand In,kWh,ENERGYLEAF_KWH,4
1,77070100020800ff@1000,Zaehlerstand Out,kWh,ENERGYLEAF_OUT,4
1,77070100100700ff@1,Leistung-akt.,W,ENERGYLEAF_CURRENT,4
#
```

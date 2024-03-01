import { Request, Response, NextFunction } from "express";

export const uploadLog = (req: Request, res: Response) => {
  if (req.file) {
    const fileContent = req.file.buffer.toString();
    const regex =
      /(?<time>\d{6}).\d{3}\| ALWAYS\| Chat received valid message: (?<message>.+) with speaker DisplayName (?<speaker>.+) and preamble <font color="#40C1FF">\[(?<target>.+)\] (.*?) \((?<champion>.*?)\): <\/font>/g;
    const matches = [...fileContent.matchAll(regex)];
    const data = [];

    for (const match of matches) {
      let timeValue = parseInt(match.groups?.time ?? "0", 10);
      let secondsTotal = Math.floor(timeValue - 6);
      let minutes = Math.floor(secondsTotal/60);
      let seconds = secondsTotal%60;
      let timeResult = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
      data.push({
        time: timeResult,
        champion : match.groups?.champion,
        target : match.groups?.target,
        speaker: match.groups?.speaker,
        message: match.groups?.message,
      });
    }

    res.render('afterExtract',{messages:data});
  } else {
    res.redirect('/?uploadFailed=true');
  }
};

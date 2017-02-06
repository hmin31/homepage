package com.frw.utl;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.servlet.view.AbstractView;

import com.frw.exception.CustomedExceptionImpl;

/**
	 * <B>Project Name : </B>tMallFlightBackOffice<br/>
	 * <B>Package Name : </B>com.frw.utl<br/>
	 * <B>File Name : </B>DownloadView<br/>
	 * <B>Description</B>
	 * <ul> 
	 * <li>fileDownload 처리하는 view
	 * </ul>
	 * 
	 * @author hist
	 * @since 2016. 10. 12.
	 */
@Component
public class DownloadView extends AbstractView {

	protected Logger log = LoggerFactory.getLogger(DownloadView.class);

	public DownloadView() {
		setContentType("application/download; charset=utf-8");
	}

	@Override
	protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest req, HttpServletResponse res)
			throws Exception {
		log.debug(">>>>> >>>>> >>>>> DownloadView, renderMergedOutputModel");

		File file = (File) model.get("downloadFile");

		res.setContentType(getContentType());
		res.setContentLength((int) file.length());

		String userAgent = req.getHeader("User-Agent");
		String fileName = null;

		if (userAgent.indexOf("MSIE") > -1) {
			fileName = URLEncoder.encode(file.getName(), "utf-8");
		} else {
			fileName = new String(file.getName().getBytes("utf-8"), "iso-8859-1");
		}

		res.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\";");
		res.setHeader("Content-Transfer-Encoding", "binary");

		OutputStream os = res.getOutputStream();
		FileInputStream fis = null;

		try {
			fis = new FileInputStream(file);
			FileCopyUtils.copy(fis, os);

		} finally {
			if (fis != null) {
				try {
					fis.close();
				} catch (IOException e) {
					log.error("<<<<< <<<<< <<<<< DownloadView - renderMergedOutputModel - IOException: "
							+ e.getMessage());
				}
			} else {
				log.error("<<<<< <<<<< <<<<< DownloadView - renderMergedOutputModel - file is not found");
				throw new CustomedExceptionImpl(604, "file is not found");
			}
		}
		os.flush();

	}

}

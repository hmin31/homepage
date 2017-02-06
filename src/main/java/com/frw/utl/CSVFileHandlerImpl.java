package com.frw.utl;

import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.Writer;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.frw.exception.CustomedExceptionImpl;
import com.frw.svc.BizServiceImpl;

/**
	 * <B>Project Name : </B>tMallFlightBackOffice<br/>
	 * <B>Package Name : </B>com.frw.utl<br/>
	 * <B>File Name : </B>CSVFileHandlerImpl<br/>
	 * <B>Description</B>
	 * <ul> 
	 * <li>CSV 파일을 생성
	 * </ul>
	 * 
	 * @author hist
	 * @since 2016. 10. 28.
	 */
@Service("cSVFileHandlerImpl")
public class CSVFileHandlerImpl extends BizServiceImpl {
	
	protected final Logger log = LoggerFactory.getLogger(CSVFileHandlerImpl.class);

	/**
		 * <B>History</B>
		 * <ul>
		 * <li>Date : 2016. 10. 28.
		 * <li>Developer : hist
		 * <li>list로 부터 columnNm에 해당하는 column을 읽어 csv 파일을 생성한다.
		 * </ul>
		 *  
		 * @param FILE_HEADER
		 * @param returnList
		 * @param ColumnNm
		 * @return
		 * @throws Exception
		 */
	public String csvfileCreation(Object[] FILE_HEADER, List<?> returnList, String ColumnNm) throws Exception {

		log.debug("<<<<< <<<<< <<<<< CSVFileHandlerImpl - csvfileCreation");

		String file_id = UUID.randomUUID().toString();

//		FileWriter fileWriter = null;
		Writer fileWriter = null;
		CSVPrinter csvFilePrinter = null;
		String fileName = PropertiesUtil.getString("file.path") + "temp" + PropertiesUtil.getString("file.delimiter")
				+ file_id;
		String NEW_LINE_SEPARATOR = "\n";
		CSVFormat csvFileFormat = CSVFormat.DEFAULT.withRecordSeparator(NEW_LINE_SEPARATOR);
		HashMap<?, ?> rowData = null;
		String line;

		try {
//			fileWriter = new FileWriter(fileName);
			fileWriter = new OutputStreamWriter(new FileOutputStream(fileName), StandardCharsets.UTF_8);
			csvFilePrinter = new CSVPrinter(fileWriter, csvFileFormat);
			csvFilePrinter.printRecord(FILE_HEADER);

			for (int i = 0, j = returnList.size(); i < j; i++) {
				rowData = (HashMap<?, ?>) returnList.get(i);
				line = rowData.get(ColumnNm) == null ? "" : String.valueOf(rowData.get(ColumnNm));
				csvFilePrinter.printRecord(line.split("\\^"));
			}

		} catch (Exception e) {
			log.error("<<<<< <<<<< <<<<< FileHandlerForCSV - fileCreationForCSV" + e.toString());
			throw new CustomedExceptionImpl(604, "csv file cration error");
		} finally {
			try {
				if(fileWriter != null) {
					fileWriter.flush();
					fileWriter.close();
				}
				if(csvFilePrinter != null) csvFilePrinter.close();

			} catch (IOException e) {
				log.error("<<<<< <<<<< <<<<< FileHandlerForCSV - fileCreationForCSV" + e.toString());
				throw new CustomedExceptionImpl(604, "csv file cration IO error");
			}

		}

		return file_id;

	}

	public void csvStreamCreation(OutputStream os, Object[] FILE_HEADER, List<?> returnList, String ColumnNm) throws Exception {

		log.debug("<<<<< <<<<< <<<<< CSVFileHandlerImpl - csvStreamCreation");

		String NEW_LINE_SEPARATOR = "\n";
		CSVFormat csvFileFormat = CSVFormat.DEFAULT.withRecordSeparator(NEW_LINE_SEPARATOR);
		HashMap<?, ?> rowData = null;
		String line;
		
		PrintWriter out = new PrintWriter(new OutputStreamWriter(os, StandardCharsets.UTF_8));
//	    Writer out = new BufferedWriter(new OutputStreamWriter(os, "UTF-8"));
		out.print('\ufeff');
 
	    CSVPrinter csvPrinter = null;
	    
		try {
			
			csvPrinter = new CSVPrinter(out, csvFileFormat);
			csvPrinter.printRecord(FILE_HEADER);

			for (int i = 0, j = returnList.size(); i < j; i++) {
				rowData = (HashMap<?, ?>) returnList.get(i);
				line = rowData.get(ColumnNm) == null ? "" : String.valueOf(rowData.get(ColumnNm));
				csvPrinter.printRecord(line.split("\\^"));
			}

		} catch (Exception e) {
			log.error("<<<<< <<<<< <<<<< FileHandlerForCSV - fileCreationForCSV" + e.toString());
			throw new CustomedExceptionImpl(604, "csv file cration error");
		} finally {
			try {
				if(csvPrinter != null) {
					csvPrinter.flush();
					csvPrinter.close();
				}
				
			} catch (IOException e) {
				log.error("<<<<< <<<<< <<<<< FileHandlerForCSV - fileCreationForCSV" + e.toString());
				throw new CustomedExceptionImpl(604, "csv file cration IO error");
			}

		}

	}
	
}

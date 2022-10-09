//
//  AboutDoctorVC.swift
//  Kerala Ayurveda Connect
//
//  Created by MacBook on 13/09/20.
//  Copyright © 2020 MacBook. All rights reserved.
//

import UIKit
import SDWebImage
class AboutDoctorVC: UIViewController {
    @IBOutlet var lblDrName:UILabel!
    @IBOutlet var lblAddress:UILabel!
    @IBOutlet var lblDescption:UILabel!
    @IBOutlet var lblConsult:UILabel!
    @IBOutlet var imgDrProfile:UIImageView!
    @IBOutlet var btnConsultNow:UIButton!
    @IBOutlet var btnConsultLater:UIButton!
    var doctorModel : DoctorListModel?
    var startVCwithDoctorModel : StartVCwithDoctorModel?
    var bookAppointmentModel : BookAppointmentModel?
    var ComplaintID = String()
    var OldComplaintID = String()
    override func viewDidLoad() {
        super.viewDidLoad()
        self.title = "About Practitioner".localiz()
        btnConsultNow.setTitle("Now".localiz(), for: .normal)
        btnConsultLater.setTitle("Book Appointment".localiz(), for: .normal)
        if let isLoggedIn = doctorModel?.isLoggedIn,isLoggedIn == true
        {
            btnConsultNow.isHidden = true//as per USA business logic
        }
        else
        {
            btnConsultNow.isHidden = true
        }
        
        dataSetDoctor()
    }
    func dataSetDoctor()
    {
        lblDrName.lblTitleFontSizeSet(size: size16, name: Helvetica_Bold)
        lblAddress.lblTitleFontSizeSet(size: size16, name: Helvetica)
        lblDescption.lblTitleFontSizeSet(size: size16, name: Helvetica)
        btnConsultNow.ButttonTitleFontSizeSet(size: size16, name: Helvetica_Bold)
        btnConsultLater.ButttonTitleFontSizeSet(size: size16, name: Helvetica_Bold)
        lblConsult.lblTitleFontSizeSet(size: size16, name: Helvetica_Bold)
        var name = String()

        if let firstName = doctorModel?.firstName,!firstName.isEmpty {
            if let lastName = doctorModel?.lastName, !lastName.isEmpty {
               name = ("\(firstName)\(" ")\(lastName)")
            }else{
                name = firstName
            }
        }
        lblDrName.text = name
        if let address = doctorModel?.address,!address.isEmpty {
            if let zipcode = doctorModel?.zipcode, !zipcode.isEmpty {
                lblAddress.text = ("\(address)\(" ")\(zipcode)")
            }else{
                lblAddress.text = address
            }
        }else{
            if let zipcode = doctorModel?.zipcode, !zipcode.isEmpty {
                lblAddress.text = zipcode
            }else{
                lblAddress.text = ""
            }
        }
        
        if let doctorImage = doctorModel?.doctorImage, !doctorImage.isEmpty {
            let urlString = doctorImage.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
            imgDrProfile.sd_setImage(with: URL(string:urlString!), placeholderImage: UIImage(named: "userTemp"), completed: {(_ image: UIImage?, _ error: Error?, _ cacheType: SDImageCacheType, _ imageURL: URL?) -> Void in
           })
        }
        if let breifnote = doctorModel?.breifnote, !breifnote.isEmpty {
            lblDescption.text = breifnote
        }else{
            lblDescption.text = ""
        }
    }
    // MARK: - btnConsultNowAction
    @IBAction func btnConsultNowAction(_ sender: Any)
    {
        let appointmentSummaryVC = AppointmentSummaryVC.loadFromNib()
        appointmentSummaryVC.doctorModel = doctorModel
        appointmentSummaryVC.titleButton = "Consult Now"
        appointmentSummaryVC.startVCwithDoctorModel = self.startVCwithDoctorModel
        appointmentSummaryVC.ComplaintID = self.ComplaintID
        appointmentSummaryVC.OldComplaintID = self.OldComplaintID
        self.navigationController?.pushViewController(appointmentSummaryVC, animated: true)
        
    }
    // MARK: - btnConsultNowAction
    @IBAction func btnConsultLaterAction(_ sender: Any)
    {
        let scheduleAppointmentVC = ScheduleAppointmentVC.loadFromNib()
        scheduleAppointmentVC.doctorModel = self.doctorModel
        scheduleAppointmentVC.bookAppointmentModel = self.bookAppointmentModel
        scheduleAppointmentVC.ComplaintID = self.ComplaintID
        scheduleAppointmentVC.OldComplaintID = self.OldComplaintID
        self.navigationController?.pushViewController(scheduleAppointmentVC, animated: true)
    }
    
}

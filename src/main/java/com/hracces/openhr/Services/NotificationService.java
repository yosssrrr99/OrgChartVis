package com.hracces.openhr.Services;


import com.hracces.openhr.Repositories.EmployeeRecRepositories;
import com.hracces.openhr.Repositories.NotificationRepositories;
import com.hracces.openhr.entities.EmployeeRec;
import com.hracces.openhr.entities.Notification;
import com.hracces.openhr.entities.Status;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepositories notificationRepositories;
    private final EmployeeRecRepositories employeeRecRepositories;
    public void sendNotificationToManager(String managerId, String message) {
        Notification notification = new Notification();
        notification.setIdManger(managerId);
        notification.setMessage(message);
        notification.setRead(false);
        notification.setDate(LocalDateTime.now());
        notificationRepositories.save(notification);
    }
    public void updateStatusApp(String managerId) {
        List<EmployeeRec> employeeRecs = employeeRecRepositories.findAllByIdManger(managerId);

        String message="";
        for (int i = 0; i < employeeRecs.size(); i++) {
            EmployeeRec emp = employeeRecs.get(i);
            emp.setTypeStatus(Status.Approuver);
            emp.setStatus(true);
            employeeRecRepositories.save(emp);
        }


        message = "La demande est acceptée.";

        sendNotificationToManager(managerId, message);
    }


    public void updateStatusRef(String managerId) {
        List<EmployeeRec> employeeRecs = employeeRecRepositories.findAllByIdManger(managerId);
        String message="";

        for (int i = 0; i < employeeRecs.size(); i++) {
            EmployeeRec emp = employeeRecs.get(i);
            emp.setTypeStatus(Status.Refuser);
            emp.setStatus(true);
            employeeRecRepositories.save(emp);

        }

        message = "la demande est refusée.";

        sendNotificationToManager(managerId, message);
    }

    public List<Notification> getNotificationsByManagerId(String managerId) {
        return notificationRepositories.findByIdMangerAndIsRead(managerId,false);
    }


    public void markNotificationAsRead(Long notificationId) {
        Notification notification = notificationRepositories.findById(notificationId)
                .orElseThrow(() -> new EntityNotFoundException("Notification not found with id: " + notificationId));

        notification.setRead(true);
        notificationRepositories.save(notification);
    }

    public int nbNotif(String idManager){
        return notificationRepositories.countfindMangerTypeStatus(idManager);
    }
}

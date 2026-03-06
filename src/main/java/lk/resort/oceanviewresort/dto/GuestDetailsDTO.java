package lk.resort.oceanviewresort.dto;

public class GuestDetailsDTO {
    private String name;
    private String contact;

    public GuestDetailsDTO() {
    }

    public GuestDetailsDTO(String name, String contact) {
        this.setName(name);
        this.setContact(contact);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }
}

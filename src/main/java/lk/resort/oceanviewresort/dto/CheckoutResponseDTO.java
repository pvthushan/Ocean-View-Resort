package lk.resort.oceanviewresort.dto;

public class CheckoutResponseDTO {
    private String message;
    private InvoiceDTO invoice;

    public CheckoutResponseDTO() {
    }

    public CheckoutResponseDTO(String message, InvoiceDTO invoice) {
        this.setMessage(message);
        this.setInvoice(invoice);
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public InvoiceDTO getInvoice() {
        return invoice;
    }

    public void setInvoice(InvoiceDTO invoice) {
        this.invoice = invoice;
    }
}

package com.duyen.firstspringdata.entities;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity // This is mandatory
@Cache(usage = CacheConcurrencyStrategy.READ_ONLY)
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id // This is mandatory
    private int id;

    private String name;

    @Column(name = "description")
    // Have to add Column annotation if the property name is diff from column name in DB
    private String desc;

    private Double price;


    /// *********** getters and setters ***************

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", desc='" + desc + '\'' +
                ", price=" + price +
                '}';
    }
}
